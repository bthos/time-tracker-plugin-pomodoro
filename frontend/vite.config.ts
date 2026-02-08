import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Check if a file exists locally
function isLocalFile(id: string): boolean {
  // Remove query strings and hashes
  const cleanId = id.split('?')[0].split('#')[0];
  
  // Check for relative imports
  if (cleanId.startsWith('.')) {
    const resolvedPath = path.resolve(__dirname, 'src', cleanId);
    return fs.existsSync(resolvedPath) || fs.existsSync(resolvedPath + '.ts') || fs.existsSync(resolvedPath + '.tsx');
  }
  
  return false;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PomodoroPlugin',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: (id) => {
        // Externalize node_modules
        if (!id.startsWith('.') && !path.isAbsolute(id)) {
          return true;
        }
        
        // Externalize SDK-provided modules that don't exist locally
        if (id.includes('/utils/') || 
            id.includes('/Common/') || 
            id.includes('/Layout/') ||
            id.includes('/store') ||
            id.includes('/services/') ||
            id.includes('/hooks/useProjects') ||
            id.includes('/hooks/useTasks') ||
            id === 'date-fns') {
          return true;
        }
        
        // Keep local files internal
        return false;
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
