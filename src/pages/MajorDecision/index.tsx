import Button from '@components/Button';
import useMajor from '@hooks/useMajor';
import { useNavigate } from 'react-router-dom';

const MajorDecision = () => {
  const navigate = useNavigate();
  const { major, setMajor } = useMajor();

  const onClick = () => {
    setMajor('컴퓨터공학과');
    alert('전공 선택 완료!');
    navigate('/');
  };

  return (
    <>
      <Button onClick={onClick}>컴퓨터공학과로 전공 선택하기</Button>
      <span role="note">{major}</span>
    </>
  );
};

export default MajorDecision;
