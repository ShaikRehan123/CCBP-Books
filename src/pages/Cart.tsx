import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart";
import { Book } from "@/types";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      {selectedItems.length > 0 && (
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-bold">
            {selectedItems.length} items selected
          </div>
          <div className="space-x-4">
            <Button
              onClick={() => {
                selectedItems.forEach((item) => removeFromCart(item));
                setSelectedItems([]);
              }}
              variant={"destructive"}
            >
              Remove from cart
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Checkout",
                  description: "Checkout is not implemented yet",
                });
                selectedItems.forEach((item) => removeFromCart(item));

                setSelectedItems([]);
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {cart.map((item: Book) => (
          <Card
            className={`relative ${
              selectedItems.includes(item.isbn13)
                ? "bg-gray-100 dark:bg-gray-800"
                : ""
            }`}
            key={item.isbn13}
          >
            <CardHeader className="ml-4 flex !flex-row !items-center gap-3">
              <Checkbox
                checked={selectedItems.includes(item.isbn13)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedItems([...selectedItems, item.isbn13]);
                  } else {
                    setSelectedItems(
                      selectedItems.filter((i) => i !== item.isbn13)
                    );
                  }
                }}
                className="w-5 h-5"
              />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
          <h2 className="text-2xl font-bold">Cart is empty</h2>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Explore books
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
