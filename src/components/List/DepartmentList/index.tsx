interface DepartmentListProps {
  college: string;
}

const DepartmentList = (props: DepartmentListProps) => {
  console.log(props.college);
  return <div>qwe</div>;
};

export default DepartmentList;
