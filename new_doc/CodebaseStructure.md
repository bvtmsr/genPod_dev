# Genpod Application Codebase Documentation

## Project Overview
This document provides a comprehensive overview of the Genpod application codebase structure and organization.

## Directory Structure

### Root Source Directory (`src/`)

```
src/
├── __tests__/           # Test files
├── api/                 # API integration and middleware
├── assets/             # Static assets
├── canvas/             # Canvas-related components
├── components/         # Reusable UI components
├── feature-flag-configs/ # Feature flag configurations
├── hoc/                # Higher-Order Components
├── hooks/              # Custom React hooks
├── notifications/      # Notification system
├── pages/             # Page components
├── store/             # State management
├── styles/            # Global styles
├── utils/             # Utility functions
```

### Core Files
- `App.tsx` - Main application component
- `main.tsx` - Application entry point
- `constants.global.ts` - Global constants
- `theme.ts` - Theme configuration
- `emitter.ts` - Event emitter implementation

## Component Documentation

### Higher-Order Components (`src/hoc/`)
- [HydrationZustand](../src/hoc/HydrationZustand.md)
  - Handles Zustand state hydration
  - Prevents hydration mismatch errors
  
- [Protected](../src/hoc/Protected.md)
  - Route protection implementation
  - Authentication handling

### Hooks (`src/hooks/`)
- [useForceUpdate](../src/hooks/useForceUpdate.md)
  - Component re-render trigger
  - Zero dependencies
  
- [useKeyForceReRender](../src/hooks/useKeyForceReRender.md)
  - Key-based re-rendering
  - State reset capabilities
  
- [useStreamData](../src/hooks/useStreamData.md)
  - Streaming data handling
  - Real-time updates
  
- [useSyncActions](../src/hooks/useSyncActions.md)
  - Project synchronization
  - API integration

### Store Management (`src/store/`)
- [InitStores](../src/store/InitStores.md)
  - Store initialization
  - Zustand store setup
  
- [FeatureFlagStore](../src/store/FeatureFlagStore.md)
  - Feature flag management
  - Dynamic configuration
  
- [ProjectStore](../src/store/ProjectStore.md)
  - Project state management
  - CRUD operations
  
- [UserStore](../src/store/UserStore.md)
  - User authentication state
  - Session management

### Utilities (`src/utils/`)
- [AsyncHelpers](../src/utils/AsyncHelpers.md)
  - Asynchronous utilities
  - Timing functions
  
- [Logger](../src/utils/Logger.md)
  - Centralized logging
  - Development tools
  
- [Socket](../src/utils/Socket.md)
  - WebSocket integration
  - Real-time communication
  
- [Transformers](../src/utils/Transformers.md)
  - Data transformation
  - Type conversion

## Key Features

### State Management
- Zustand for global state
- Feature flag system
- User authentication
- Project management

### UI Components
- Mantine UI integration
- Custom components
- Responsive design
- Theme support

### Development Tools
- TypeScript support
- Development utilities
- Testing infrastructure
- Logging system

## Best Practices

### Code Organization
1. Component modularity
2. Type safety
3. Clear file structure
4. Documentation standards

### State Management
1. Centralized stores
2. Type-safe actions
3. Persistent storage
4. Error handling

### Security
1. Route protection
2. Authentication
3. Data validation
4. Error boundaries

## Development Guidelines

### Component Creation
1. TypeScript interfaces
2. Proper documentation
3. Unit testing
4. Error handling

### Store Management
1. Type definitions
2. Action creators
3. State persistence
4. Error handling

### Utility Functions
1. Type safety
2. Documentation
3. Error handling
4. Performance

## Getting Started

### Prerequisites
- Node.js
- npm/yarn
- TypeScript knowledge
- React experience

### Setup
1. Clone repository
2. Install dependencies
3. Configure environment
4. Start development server

## Contributing
1. Code standards
2. Documentation
3. Testing
4. Review process

## Additional Resources
- Component documentation
- API documentation
- Development guides
- Testing guides
