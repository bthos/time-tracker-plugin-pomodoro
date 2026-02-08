# Pomodoro Plugin Frontend

This directory contains the frontend components for the Pomodoro plugin.

## Structure

- `src/components/` - React components (Pomodoro, PomodoroTimer, FocusSessions, PomodoroWidget)
- `src/hooks/` - React hooks (usePomodoro, useFocusSessions, useDeleteFocusSession)
- `src/index.ts` - Plugin entry point that registers components with the core app
- `src/types.ts` - Plugin frontend API type definitions

## Building

```bash
npm install
npm run build
```

This creates `dist/index.js` which is the plugin frontend bundle.

## Note on Imports

The copied components currently have import paths that reference the core app. These need to be refactored to work as standalone plugin components.

## Integration

The plugin frontend bundle is loaded dynamically by the core app and registers:
- Route: `/pomodoro`
- Sidebar item: Pomodoro
- Dashboard widget: PomodoroWidget
