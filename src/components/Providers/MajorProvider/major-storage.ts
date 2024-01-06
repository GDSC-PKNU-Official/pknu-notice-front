interface IMajorStorage {
  getMajor: () => string | null;
  setMajor: (major: string) => void;
}

class MajorStorage implements IMajorStorage {
  private TOKEN_KEY;

  constructor(key: string) {
    this.TOKEN_KEY = key;
  }

  getMajor() {
    const major = localStorage.getItem(this.TOKEN_KEY);
    return major;
  }

  setMajor(major: string) {
    localStorage.setItem(this.TOKEN_KEY, major);
  }
}

export default MajorStorage;
