# Test User
email: asd@asd.asd
pass: asdasdasd

# Start Coding
1. cp .env.example .env
2. docker-compose up -d

# If you have problems with the docker 
1. cp .env.example .env
2. npm i
3. npm run dev

# Dependencies
## @headlessui/react and @headlessui/tailwindcss
Version: ^1.7.17 and ^0.2.0 respectively
Description: These packages provide accessible and reusable UI components for building user interfaces with Tailwind CSS.

## @hookform/resolvers
Version: ^3.3.0
Description: This package provides resolver functions for the React Hook Form library, which helps with form validation in React applications.

## @reduxjs/toolkit
Version: ^1.9.5
Description: Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It includes utilities to simplify common Redux use cases.

## @tanstack/react-query
Version: ^4.33.0
Description: This package provides hooks and utilities for managing asynchronous data in React applications using the React Query library.

## @types/node, @types/react, @types/react-dom
Version: Specific version numbers are mentioned (e.g., 20.5.6, 18.2.21, 18.2.7)
Description: These packages provide TypeScript type definitions for Node.js, React, and React DOM, respectively. They enhance your development experience by adding static type checking and better IDE support.

## autoprefixer
Version: 10.4.15
Description: Autoprefixer is a PostCSS plugin that automatically adds vendor prefixes to your CSS, ensuring compatibility with different browser versions.

## class-variance-authority
Version: ^0.7.0
Description: This package seems to be a custom package related to class variance authority. More specific details about its functionality would be required to provide accurate documentation.

## clsx
Version: ^2.0.0
Description: This package provides a utility function for conditionally joining CSS class names together. It's often used in React applications for conditional styling.

## dayjs
Version: ^1.11.9
Description: Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times.

## graphql, graphql-request, graphql-tag
Version: Specific version numbers are mentioned (e.g., ^16.8.0, ^6.1.0, ^2.12.6)
Description: These packages are related to GraphQL, a query language for APIs. graphql provides the core functionality, graphql-request is a simplified GraphQL client, and graphql-tag is used to parse GraphQL queries from template literals.

## next, next-auth
Version: Specific version numbers are mentioned (e.g., ^13.4.19, ^4.23.1)
Description: next is a popular framework for building server-rendered React applications. next-auth provides authentication and authorization functionalities for Next.js applications.

## react, react-dom, react-hook-form, react-redux
Versions: Specific version numbers are mentioned (e.g., 18.2.0, ^7.45.4, ^8.1.2)
Description: These packages are fundamental to building React applications. react and react-dom are for building UI components and rendering them in the browser. react-hook-form provides form handling in React, and react-redux connects Redux state management with React components.

## socket.io-client
Version: ^4.7.2
Description: This package provides a client-side library for Socket.IO, enabling real-time communication between the server and clients in web applications.

## tailwind-merge, tailwindcss
Version: ^1.14.0, 3.3.3 respectively
Description: tailwind-merge is a utility for merging multiple Tailwind CSS configuration files. tailwindcss is the core package for using Tailwind CSS, a utility-first CSS framework.

## typescript
Version: 5.2.2
Description: TypeScript is a superset of JavaScript that adds static types to the language, helping catch type-related errors during development.

## zod
Version: ^3.22.2
Description: zod is a TypeScript-first schema declaration and validation library. It's commonly used for working with data validation and serialization.

# Dev Dependencies

## @trivago/prettier-plugin-sort-imports
Version: ^4.2.0
Description: This package is a Prettier plugin that helps sort import declarations in your code consistently.

## bufferutil, encoding, utf-8-validate
Version: Specific version numbers are mentioned (e.g., ^4.0.7, ^0.1.13, ^5.0.10)
Description: These packages seem to be related to handling buffer data and validating UTF-8 encoding, which might be relevant for resolving the import trace bug in your app directory.

## prettier
Version: ^3.0.2
Description: Prettier is an opinionated code formatter that helps maintain consistent code style across your project.

## prettier-plugin-tailwindcss
Version: ^0.5.3
Description: This Prettier plugin helps format Tailwind CSS classes in a consistent and aesthetically pleasing way.

## react-icons
Version: ^4.10.1
Description: This package provides a collection of popular icons for use in React applications.
