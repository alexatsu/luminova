import { useState, useRef, useEffect } from "react";
import { handleFetch } from "../utils";
import { useDebounce } from "./useDebounce";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../utils";

const { search } = endpoints;

export function useSearch() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === "") setSuggestions([]);
  };

  const { debouncedValue: debouncedQuery } = useDebounce(input, 400);

  useEffect(() => {
    const requestSuggestions = async () => {
      const url = search.suggestions;
      const query = `?query=${debouncedQuery}`;

      if (debouncedQuery === "") return;

      const { suggestions } = (await handleFetch(`${url}/${query}`)) as {
        suggestions: string[];
      };

      const limit = 5;
      setSuggestions(suggestions.slice(0, limit));
    };

    requestSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !ulRef.current?.contains(e.target as Node) &&
        !document.querySelector(".search-navbar")!.contains(e.target as Node)
      ) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === "") return;

    if (event.key === "Enter") {
      navigate("/search/images/" + input);
      return;
    }
  };

  return {
    input,
    inputChange,
    sendSearch,
    isSuggestionsOpen,
    setIsSuggestionsOpen,
    suggestions,
    ulRef,
  };
}
