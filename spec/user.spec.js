const User = require('../User');
let user;

describe("User name", () => {
  beforeEach(() => {
    user = new User('Xavier');
  });

  it("should not be an empty string", () => {
    expect(user.name.length).toBeGreaterThan(0);
  });

  it("should contain only alphabetic characters", () => {
    expect(user.nameIsValid()).toBeTruthy();
  });

  it("should be made valid", () => {
    expect(user.makeNameValid()).toBeTruthy();
  });

});

describe("User password", () => {
  beforeEach(() => {
    user = new User('Xavier', '1234');
  });

  it("should be at least 4 characters long", () => {
    expect(user.passwordIsValid()).toBeTruthy();
  });

  it("should be hashed before saving to db", () => {
    user._hashPassword().then((data) => {
      expect(data.hashedPw).toEqual(data.hash);
    });
  });


});