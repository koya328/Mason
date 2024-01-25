_FUNCTIONS = [
    {
        "type": "function",
        "function": {
            "name": "mine_block",
            "description": "mine and collect specified items in Minecraft.",
            "parameters": {
                "type": "object",
                "properties": {
                    "item": {"type": "string", "description": "Specify the Minecraft item ID of the item to be collected."},
                    "count": {"type": "integer", "description": "Specify the number of pieces to collect."},
                },
                "required": ["item", "count"],
            },
        }
    },
    {
        "type": "function",
        "function": {
            "name": "craft_item",
            "description": "Create specified items in Minecraft using the Crafting Table.",
            "parameters": {
                "type": "object",
                "properties": {
                    "item": {"type": "string", "description": "Items to be crafted."},
                    "count": {"type": "integer", "description": "Number of items to craft."},
                },
                "required": ["item", "count"],
            },
        }
    },
]


def all_functiuons():
    return _FUNCTIONS
