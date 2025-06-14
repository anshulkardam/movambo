"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Film, Calendar, Plus, Lock, Unlock } from "lucide-react";

const initialMovies = [
  { name: "Dune: Part Two", date: "2024-03-15" },
  { name: "Oppenheimer", date: "2024-02-28" },
  { name: "Her", date: "2023-12-08" },
];

// Hard-coded password (in real app, this would be properly secured)
const ADMIN_PASSWORD = "mambokardam";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const [movies, setMovies] = useState(initialMovies);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({ name: "", date: "" });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
      setPassword("");
    }
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMovie.name && newMovie.date) {
      setMovies([newMovie, ...movies]);
      setNewMovie({ name: "", date: "" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
           
            <div>
              <h1 className="text-4xl font-bold font-mono text-white">Movie Nights</h1>
              <p className="text-slate-400 text-lg mt-1">
                Movies we've watched together
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-black text-white">
              {movies.length} movies
            </Badge>

            {!isAuthenticated ? (
              <form onSubmit={handleAuth} className="flex items-center gap-2">
                <Input
                  type="password"
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border-none text-slate-100 w-40"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  <Lock className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Movie
                </Button>
                <Button
                  onClick={() => setIsAuthenticated(false)}
                  variant="outline"
                  size="sm"
                  className="border-none text-slate-400 hover:bg-black"
                >
                  <Unlock className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Add Movie Form */}
        {isAuthenticated && showAddForm && (
          <Card className="bg-black mb-8">
            <CardContent className="p-6 bg-black">
              <form onSubmit={handleAddMovie} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="movieName" className="text-slate-300">
                      Movie Name
                    </Label>
                    <Input
                      id="movieName"
                      value={newMovie.name}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, name: e.target.value })
                      }
                      className="bg-black border-none text-slate-100 mt-1"
                      placeholder="Enter movie title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="watchDate" className="text-slate-300">
                      Date Watched
                    </Label>
                    <Input
                      id="watchDate"
                      type="date"
                      value={newMovie.date}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, date: e.target.value })
                      }
                      className="bg-black border-none text-slate-100 mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    Add Movie
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-none text-slate-400 hover:bg-black"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Movie List */}
        <Card className="bg-black border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Calendar className="h-5 w-5 text-white" />
              Our Movie Collection
            </CardTitle>
            <CardDescription className="text-slate-400">
              A chronicle of our cinematic adventures
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-black">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-black border-none">
                  <TableHead className="text-white font-semibold px-6 py-4 border-none">
                    Movie Title
                  </TableHead>
                  <TableHead className="text-white font-semibold text-right px-6 py-4 border-none">
                    Date Watched
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.map((movie, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-black transition-colors border-none"
                  >
                    <TableCell className="font-medium text-slate-100 px-6 py-4 border-none">
                      {movie.name}
                    </TableCell>
                    <TableCell className="text-slate-300 text-right px-6 py-4 border-none">
                      {formatDate(movie.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-left mt-12 text-slate-600">
          <p className="text-sm">
            Made with ❤️ for movie nights with Mambo
          </p>
        </div>
      </div>
    </div>
  );
}
