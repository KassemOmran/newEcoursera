export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateRequired(fields) {
  for (let key in fields) {
    if (!fields[key] || fields[key].toString().trim() === "") {
      return { valid: false, field: key };
    }
  }
  return { valid: true };
}

export function validateRegister(data) {
  if (!validateEmail(data.email)) {
    return { valid: false, message: "Invalid email format" };
  }

  if (!validatePassword(data.password)) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }

  return { valid: true };
}

export function validateCourse(course) {
  const required = ["title", "description", "category"];
  for (let field of required) {
    if (!course[field]) {
      return { valid: false, message: `${field} is required` };
    }
  }
  return { valid: true };
}
