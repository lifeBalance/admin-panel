export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface Role {
    id: number,
    name: string
  }

  interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    role: Role
  }
  interface Permission {
    id: number,
    name: string
  }
}
