import os
import logging
import fastjsonschema
from ruamel.yaml import YAML
from modules.files import ReadFile, WriteFile

log = logging.getLogger(__name__)
yaml = YAML()
yaml.default_flow_style = False

block_schema = {
    "type": "object",
    "properties": {
        "block_list" : {"type": "array"}
    }
}

file = "stats\CatchBlockList.yml"

# Create block list file if doesn't exist
if not os.path.exists(file):
    WriteFile(file, "block_list: []")
        
block_schema = {
    "type": "object",
    "properties": {
        "block_list" : {"type": "array"}
    }
}

def blockListManagement(pkmName, catch):
    # read current block list into array
    block_list = yaml.load(ReadFile(file))
    if catch:
        for i,x in enumerate(block_list["block_list"]):
            if pkmName == x:
                # remove the selected mon from the array
                block_list["block_list"].pop(i)
        # write back to yml
        data = yaml.load(ReadFile(file))
        data["block_list"] = block_list["block_list"]
        with open(file, "w") as fp:
            yaml.dump(data, fp)
    if not catch:
        # add pokemon to the block list
        block_list["block_list"].append(pkmName)
        
        # write back to yml
        data = yaml.load(ReadFile(file))
        data["block_list"] = block_list["block_list"]
        with open(file, "w") as fp:
            yaml.dump(data, fp)