import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [query]);

  const {
    isLoading,
    error,
    data: books,
  } = useQuery({
    queryKey: ["books", query],
    queryFn: () => {
      //axiosInstance.get("/new").then((res) => res.data.books),
      if (search) {
        const books = axiosInstance
          .get(`/search/${search}`)
          .then((res) => res.data.books);
        return books;
      } else {
        const books = axiosInstance.get("/new").then((res) => res.data.books);
        return books;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  if (error)
    return (
      <p className="text-red-500">
        Something went wrong, please try again later.
      </p>
    );

  console.log(books);

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="flex justify-between">
          <h1 className="text-4xl">Home</h1>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Find the book"
              className="w-60 shadow-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              size={"icon"}
              onClick={() => {
                if (search) {
                  navigate(`/?q=${search}`);
                } else {
                  navigate(`/`);
                }
              }}
            >
              <SearchIcon size={24} />
            </Button>
          </div>
        </div>

        {isLoading && <p>Loading...</p>}

        {!isLoading && (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              {query ? `Search results for "${query}"` : "New Books"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {books?.map(
                (book: {
                  title: string;
                  price: string;
                  image: string;
                  isbn13: string;
                }) => (
                  <Card key={book.isbn13}>
                    <CardHeader className="h-28">
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-48 "
                      />
                    </CardContent>
                    <CardFooter className="flex gap-1 ">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          navigate(`/book/${book.isbn13}`);
                        }}
                      >
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
