// Frontend entry point for Pomodoro plugin
// This file registers plugin components with the core app

import type { PluginFrontendModule, PluginFrontendAPI } from './types';
import { Pomodoro } from './components/Pomodoro';
import PomodoroWidget from './components/PomodoroWidget';
import { Timer } from 'lucide-react';

const initialize: PluginFrontendModule['initialize'] = (api: PluginFrontendAPI) => {
  // Register route
  api.registerRoute({
    path: 'pomodoro',
    component: Pomodoro,
    exact: true,
  });
  
  // Register sidebar item
  api.registerSidebarItem({
    id: 'pomodoro',
    label: 'Pomodoro',
    icon: Timer,
    route: 'pomodoro',
    order: 3,
  });
  
  // Register dashboard widget
  api.registerDashboardWidget({
    id: 'pomodoro-widget',
    component: PomodoroWidget,
    order: 20,
    gridColSpan: 1,
  });
};

const module: PluginFrontendModule = {
  initialize,
};

export default module;
