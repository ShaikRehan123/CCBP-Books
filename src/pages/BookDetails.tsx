import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { Book } from "@/types";
import { ChevronLeftIcon } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: bookDetails,
  } = useQuery<Book>({
    queryKey: ["bookDetails?", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/books/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error)
    return (
      <p className="text-red-500">
        Something went wrong, please try again later.
      </p>
    );

  return (
    <>
      <Button
        size={"icon"}
        className="mb-4"
        onClick={() => navigate(-1)}
        variant={"ghost"}
      >
        <ChevronLeftIcon className="w-6 h-6 cursor-pointer" />
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{bookDetails?.title}</CardTitle>
          <CardDescription>
            Written by <b>{bookDetails?.authors}</b> & Published by{" "}
            <b>{bookDetails?.publisher}</b>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex  gap-4">
          <img
            className="dark:bg-gray-700 rounded-lg bg-gray-200 shadow-md"
            src={bookDetails?.image}
            alt={bookDetails?.title}
          />
          <div className="space-y-4">
            <h2 className="text-lg">{bookDetails?.subtitle}</h2>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: bookDetails?.desc || "" }}
            ></div>

            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold">Language:</span>{" "}
                {bookDetails?.language}
              </div>
              <div>
                <span className="font-bold">Pages:</span> {bookDetails?.pages}
              </div>
              <div>
                <span className="font-bold">Year:</span> {bookDetails?.year}
              </div>
              <div>
                <span className="font-bold">Rating:</span> {bookDetails?.rating}
              </div>
              <div>
                <span className="font-bold">Price:</span> {bookDetails?.price}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {cart.find((item) => item?.isbn13 === bookDetails?.isbn13) ? (
            <Button
              className="w-full"
              variant={"destructive"}
              onClick={() => removeFromCart(bookDetails?.isbn13)}
            >
              Remove from cart
            </Button>
          ) : (
            <Button className="w-full" onClick={() => addToCart(bookDetails)}>
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default BookDetails;
