from typing import TypeVar, Union

# Define a type for a person object
Person = dict[str, Union[str, int, list[str], dict[str, str]]]

# Create a person object
person:Person = {
    "name": "John Doe",
    "age": 30,
    "hobbies": ["reading", "hiking", "baking"],
    "address": {"street": "123 Main St", "city": "Anytown"}
}

# Use the person object
print(person["name"])
print(person["age"])
print(person["hobbies"])
print(person["address"]["city"])




T = TypeVar('T')

def printValue(value: T) -> None:
    """Print the value of any type."""
    print(value)

# Call the function with different types of arguments
printValue("hello")
printValue(42)
printValue(True)