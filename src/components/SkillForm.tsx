"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/Button";

interface SkillSuggestion {
  id: number;
  suggestions: string;
  image: string;
}

const SkillForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SkillSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  // Simulate API call with dummy suggestions in JSON format
  const dummySuggestionsData: SkillSuggestion[] = [
    { id: 1, suggestions: "TypeScript", image: "/MedhaPersonalLogo.png" },
    { id: 2, suggestions: "React", image: "/MedhaPersonalLogo.png" },
    { id: 3, suggestions: "JavaScript", image: "/MedhaPersonalLogo.png" },
    { id: 4, suggestions: "redux", image: "/MedhaPersonalLogo.png" },
    { id: 5, suggestions: "readme", image: "/MedhaPersonalLogo.png" },
    { id: 6, suggestions: "Lion", image: "/lion.png" },
    { id: 7, suggestions: "Elephant", image: "/elephant.png" },
    { id: 8, suggestions: "Giraffe", image: "/giraffe.jpg" },
    { id: 9, suggestions: "Penguin", image: "/penguin.jpg" },
    { id: 10, suggestions: "Kangaroo", image: "/kangaroo.jpg" },
  ];

  const getSkillSuggestions = async (input: string) => {
    try {
      const enteredSkills = input.split(" ");
      const lastEnteredSkill = enteredSkills[enteredSkills.length - 1];

      // Show suggestions only when there's input and no space in the last entered skill
      if (lastEnteredSkill.trim() === "" || lastEnteredSkill.includes(" ")) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      // Filter suggestions based on the last entered skill and exclude existing tags
      const filteredSuggestions = dummySuggestionsData.filter(
        (item) =>
          item.suggestions
            .toLowerCase()
            .startsWith(lastEnteredSkill.toLowerCase()) &&
          !enteredSkills.includes(item.suggestions) &&
          !tags.includes(item.suggestions)
      );

      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching skill suggestions:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
// click suggesstions
  const handleSuggestionClick = (suggestion: SkillSuggestion) => {
    setInput((prevInput) => {
      const enteredSkills = prevInput.split(" ");
      enteredSkills[enteredSkills.length - 1] = suggestion.suggestions;
      return enteredSkills.join(" ");
    });

    setTags([...tags, suggestion.suggestions]); // Add the selected suggestion as a tag

    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter(
        (item) => item.suggestions !== suggestion.suggestions
      )
    );

    setShowSuggestions(false);
    setInput("");
  };
// cross icon
  const removeTag = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  // tags 
  const addTag = () => {
    if (input !== "" && !input.includes(" ")) {
      setTags([...tags, input]);
      setInput("");
      setShowSuggestions(false);
    }
  };

  // logic to handle conditional backspace
  const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && input === "") {
      // Handle backspace logic here (e.g., remove the last tag)
      const lastTagIndex = tags.length - 1;
      if (lastTagIndex >= 0) {
        const newTags = [...tags];
        newTags.pop();
        setTags(newTags);
      }
    }
  };
 // for the reset button
  const resetTags = () => {
    setTags([]);
  };

  useEffect(() => {
    // Hide suggestions if input is empty
    if (input.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    getSkillSuggestions(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, tags]); 

  return (
    <div className=" flex flex-col items-center gap-10">
      <div className="relative">
        <div className="tags-input">
          <ul id="tags">
            {tags.map((tag, index) => {
              const suggestion = dummySuggestionsData.find(
                (s) => s.suggestions === tag
              );
              // console.log(suggestion);
              return (
                <li
                  key={index}
                  className={` flex  flex-row items-center  gap-3 tag ${
                    index === tags.length - 1 ? "bg-sky-200" : ""
                  }`}
                >
                  {/* <Image
                  src={suggestion?.image}
                  width={28}
                  height={28}
                  alt=" image "
                  className=" rounded-full object-contain"
                /> */}
                  {suggestion && suggestion.image && (
                    <Image
                      src={suggestion.image}
                      width={28}
                      height={28}
                      alt="image"
                      className="rounded-full object-contain z-10"
                    />
                  )}
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeTag(index)}
                  >
                    x
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyUp={(event) => (event.key === "Enter" ? addTag() : null)}
              onKeyDown={handleBackspace}
              placeholder="Typing......"
            />
            <div className=" absolute inset-5 backdrop-blur-2xlmt-2 ml-5 z-10 w-48 ">
              {showSuggestions && suggestions.length > 0 && (
                <ul className="shadow shadow-slate-200  bg-slate-100 rounded-lg">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className=" flex  flex-row items-center  gap-3 cursor-pointer rounded-lg  hover:bg-gray-200 p-2 "
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Image
                        src={suggestion.image}
                        width={40}
                        height={40}
                        alt=" image "
                        className=" rounded-full"
                      />
                      <p> {suggestion.suggestions}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button className=" " variant={"destructive"} onClick={resetTags}>
        Clear all{" "}
      </Button>
    </div>
  );
};

export default SkillForm;
