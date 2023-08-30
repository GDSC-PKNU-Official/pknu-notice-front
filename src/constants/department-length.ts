interface MajorLength {
  [key: string]: number;
}

const DEPARTMENT_LENGTH: MajorLength = {
  DEFAULT: 8,
  경영대학: 2,
  공과대학: 22,
  글로벌자율전공학부: 1,
  수산과학대학: 10,
  인문사회과학대학: 12,
  자연과학대학: 6,
  정보융합대학: 12,
  환경·해양대학: 7,
};

export default DEPARTMENT_LENGTH;
