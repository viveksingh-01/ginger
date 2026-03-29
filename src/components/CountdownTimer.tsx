const CountdownTimer = ({ eta }: { eta: number }) => {
  return (
    <div className="mt-2 text-lg">
      <h5>
        <span className="opacity-80">Arriving in </span>
        {eta} mins
      </h5>
    </div>
  );
};

export default CountdownTimer;
