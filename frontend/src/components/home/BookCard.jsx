import SingleBookCard from "./SingleBookCard";

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => {
        return (
            <SingleBookCard key={item._id} book={item} />
        )
      })}
    </div>
  );
};

export default BookCard;
