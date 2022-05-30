interface ICard {
  image: string;
}

function Card({ image }: ICard) {
  return (
    <div className="order-last relative flex flex-col rounded-lg">
      <div className={`h-56 w-48 flex-none bg-cover rounded-lg text-center overflow-hidden ${image}`} />
      <span className="mt-4 mx-auto text-gray-600 text-sm font-bold">Place Holder</span>
    </div>
  );
}

export default Card;
