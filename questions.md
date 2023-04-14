# Q&A

## What is the difference between Component and PureComponent?

A Component is one of the core building blocks of React whereas a PureComponent is a type of component that re-renders only when the props passed to the component and the state haven't changed.

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

## Describe 3 ways to pass information from a component to its PARENT:

- Callback functions: Passing a handler function from the parent to the child that accepts a parameter. This parameter contains data from the child that can be sent to the parent component.
- ContextAPI: It's a tool that provides a way to send data through the tree node without using props (generally used to avoid prop drilling).
- Refs: A ref is a way to access the properties or methods of a component directly

## Give 2 ways to prevent components from re-rendering

- React.memo: It is a High Order Component that can be used to wrap other components and prevent them from re-rendering if the props haven't changed.
- PureComponents: As mentioned in the first question. PureComponents can be used to prevent unnecessary re-renders.

## What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are a modern syntax for adding multiple elements to a React Component without wrapping them in an extra DOM node. I'm not aware of any potential issues related to fragments.

## Give 3 examples of the HOC pattern.

A higher-order component is a function that takes a component and returns a new component. Some examples of the use of a HoC are:

- Custom styles: Can be used to apply specific styles to a component.
- To reuse logic: HOCs can be used to share the same logic in multiple components.
- Authentication: A HOC can be used to checks if the user is authenticated and then render the corresponding component.

## What's the difference in handling exceptions in promises, callbacks and async ... await.

- In promises the exceptions are handled using the catch() method.
- In callbacks the exceptions are handled using the try/catch statement inside the callback function.
- In async/await exceptions are handled also using the try/catch statement but in this case the try/catch statement will be wrapping the async function.

## How many arguments does setState take and why is it async.

The setState function has 2 parameters: - One for setting the new state. - A second one that is used to pass a callback that will be executed after updating the state.
It is async because React batches multiple state updates together and then executes them all at once.

## List the steps needed to migrate a Class to Function Component.

- Remove render() method.
- Convert the class component into a function component that returns JSX code.
- Replace this keywords and replace it with props/functions.
- Remove lifecycle methods.
- Replace state declarations and management methods with React hooks.

## List a few ways styles can be used with components.

- CSS: CSS files imported and applied in components using class names.
- Inline styles: Styles applied directly to an element.
- CSS modules: CSS written as modules.
- Styled components: CSS written directly in the JavaScript code.

## How to render an HTML string coming from the server.

By using dangerouslySetInnerHTML which provides a way to programmatically set HTML elements from an external source.
