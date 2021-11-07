import { useLocation, useHistory } from 'react-router';

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();

  // console.log(history);
  // console.log(location);

  const handleBackButtonClick = () => {
    history.push(location?.state?.from?.location || '/movies');
  };

  return (
    <>
      <button onClick={handleBackButtonClick}>Back</button>
      <div className="">Here will be displayed some details about movies</div>
    </>
  );
}
