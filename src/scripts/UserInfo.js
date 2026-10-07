export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    if (name !== undefined) {
      this._userName.textContent = name;
    }

    if (job !== undefined) {
      this._userJob.textContent = job;
    }

    if (avatar !== undefined) {
      this._userAvatar.src = avatar;
    }
  }
}
