import { useSearch } from "@/shared/hooks";
import { TextInput } from "@mantine/core";
import { MouseEventHandler } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import sass from "@shared/styles/components/Search.module.scss";
import { Link } from "react-router-dom";

export function Search() {
  const {
    input,
    inputChange,
    sendSearch,
    isSuggestionsOpen,
    setIsSuggestionsOpen,
    suggestions,
    ulRef,
  } = useSearch();

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <TextInput
        className="search-navbar"
        placeholder="Search images"
        variant={"filled"}
        icon={<AiOutlineSearch size={20} cursor={"pointer"} />}
        value={input}
        onChange={inputChange}
        onKeyDown={sendSearch}
        onClick={setIsSuggestionsOpen as unknown as MouseEventHandler<HTMLInputElement> | undefined}
      />

      {isSuggestionsOpen && (
        <ul ref={ulRef} className={sass.suggestions}>
          {suggestions.length === 0 ? (
            <li className={sass.list}>No results</li>
          ) : (
            suggestions.map((suggestion, index) => {
              const split = suggestion.split("/")[1];
              return (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                  to={`/search/images/${split}`}
                >
                  <li className={sass.list}>
                    {split.split(" ").map((word) => {
                      const trimmedWord = word.trim();

                      if (trimmedWord.includes(input)) {
                        return (
                          <span
                            key={crypto.randomUUID()}
                            style={{ backgroundColor: "rgb(196 244 224)" }}
                          >
                            {" "}
                            {word}
                          </span>
                        );
                      }

                      return <span key={crypto.randomUUID()}> {word} </span>;
                    })}
                  </li>
                </Link>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
