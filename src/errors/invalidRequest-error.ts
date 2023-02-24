export function invalidRequest() {
    return {
      name: "ConflictError",
      message: "Credencial inválida e/ou sem autorização",
    };
  }
  