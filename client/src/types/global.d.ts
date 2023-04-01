export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: number
  }
}
