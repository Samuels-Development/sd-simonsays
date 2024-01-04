# sd-simonsays

This resource introduces a Simon Says minigame. Players must memorize and repeat a sequence of illuminated tiles, with the sequence increasing in length each round.

Feel free to star the repository and check out my store and discord @ Discord: https://discord.gg/samueldev & Store: https://fivem.samueldev.shop 
For support inquiries, please create a post in the support-forum channel on discord or create an issue here on Github.

## Preview
![FiveM_b2944_GTAProcess_r6PlRoRTOT](https://github.com/Samuels-Development/sd-simonsays/assets/99494967/80686e6a-9ea5-45d4-a53c-50782654b88a)

### Video Preview

https://github.com/Samuels-Development/sd-simonsays/assets/99494967/8106d5ce-970c-4e2f-8d3a-4efe99bb6cdb

(The Minigame does make sound, the video simply isn't capturing my computers sounds)

## Installation

1. Clone or download this resource.
2. Place it in the server's resource directory.
3. Add the resource to your server config.

## Usage

- `OpenSimonSays(gridSize, repetitions)`
   - `gridSize`: Size of the game grid (e.g., `4` for a 4x4 grid). (3 is the minimum, 7 is the maximum
   - `repetitions`: Number of sequences the player must correctly repeat to win. (ex. 4)

## Exports 
Exclusively available on the client side.

 `StartSimonSays`: Initiates the Simon Says game with specified parameters.

### Example Usage
```lua
RegisterCommand('testSimon', function()
    exports['sd-simonsays']:StartSimonSays(function(success)
        if success then 
            print("Success")
        else
            print("Failed")
        end
    end, 4, 3)
end)
