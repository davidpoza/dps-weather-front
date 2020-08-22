export default function createUser({
  id,
  createdOn,
  email,
  firstName,
  lastName,
  password,
  token,
  updatedOn,
}) {
  return ({
    id,
    createdOn,
    email,
    firstName,
    lastName,
    password,
    token,
    updatedOn,
  });
}
