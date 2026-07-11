import { useState, useEffect } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { MarketplaceItem } from "@/lib/mock-data";
import { getStorage, setStorage } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Store, Tag, MapPin, Search, Plus, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Marketplace() {
  const user = useRequireAuth();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<MarketplaceItem['category']>("Books");
  const [condition, setCondition] = useState<MarketplaceItem['condition']>("Good");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      setItems(getStorage<MarketplaceItem[]>('unihub_marketplace', []));
    }
  }, [user]);

  if (!user) return null;

  const handlePost = () => {
    if (!title || !price) return;
    const newItem: MarketplaceItem = {
      id: Math.random().toString(36).substring(7),
      title,
      price: Number(price),
      category,
      condition,
      description,
      sellerName: user.name,
      university: user.university,
      createdAt: new Date().toISOString()
    };
    
    const updated = [newItem, ...items];
    setItems(updated);
    setStorage('unihub_marketplace', updated);
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setCategory("Books");
    setCondition("Good");
    setDescription("");
  };

  const toggleWishlist = (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, wishlisted: !i.wishlisted } : i);
    setItems(updated);
    setStorage('unihub_marketplace', updated);
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || i.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campus Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Buy and sell books, electronics, and supplies within your university network.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={open => { setIsDialogOpen(open); if(!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post an Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>List an item for sale</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Calculus 8th Edition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="45.00" />
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={condition} onChange={e => setCondition(e.target.value as MarketplaceItem['condition'])}>
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onChange={e => setCategory(e.target.value as MarketplaceItem['category'])}>
                  <option value="Books">Textbooks</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Study Equipment">Study Equipment</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Any specific details, damages, or pickup instructions..." />
              </div>
              <Button className="w-full" onClick={handlePost}>Publish Listing</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search items..." 
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Books">Textbooks</option>
            <option value="Electronics">Electronics</option>
            <option value="Study Equipment">Equipment</option>
            <option value="Other">Other</option>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="hover-elevate h-full flex flex-col overflow-hidden bg-card border-border group">
              <div className="aspect-square bg-sidebar relative flex items-center justify-center border-b text-muted-foreground group-hover:bg-primary/5 transition-colors">
                <Store className="w-16 h-16 opacity-20" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`absolute top-2 right-2 rounded-full bg-background/50 backdrop-blur-sm border ${item.wishlisted ? 'text-red-500 border-red-200' : 'text-muted-foreground'}`}
                  onClick={() => toggleWishlist(item.id)}
                >
                  <Heart className={`w-4 h-4 ${item.wishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <span className="font-bold text-lg text-primary shrink-0 ml-2">${item.price}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Badge variant="outline" className="font-normal text-[10px]">{item.condition}</Badge>
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-0.5" />
                    {item.university}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {item.description}
                </p>
                
                <div className="pt-3 border-t mt-auto flex items-center justify-between">
                  <div className="text-xs font-medium truncate">
                    Seller: {item.sellerName}
                  </div>
                  <Button size="sm" variant="secondary" className="shrink-0">
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-sidebar border-border">
          <Tag className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-lg">No items found</h3>
          <p className="text-muted-foreground mt-1">Try a different search or be the first to sell something.</p>
        </div>
      )}
    </div>
  );
}
