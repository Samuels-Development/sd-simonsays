# sd-simonsays

This resource introduces a Simon Says minigame to FiveM servers. Players must memorize and repeat a sequence of illuminated tiles, with the sequence increasing in length each round.

Feel free to star the repository and check out my store and discord @ Discord: https://discord.gg/samueldev & Store: https://fivem.samueldev.shop 
For support inquiries, please create a post in the support-forum channel on discord or create an issue here on Github.

## Preview
![FiveM_b2944_GTAProcess_r6PlRoRTOT](https://github.com/Samuels-Development/sd-simonsays/assets/99494967/80686e6a-9ea5-45d4-a53c-50782654b88a)


## Installation

1. Clone or download this resource.
2. Place it in the server's resource directory.
3. Add the resource to your server config.

## Usage

- `OpenSimonSays(gridSize, repetitions)`
   - `gridSize`: Size of the game grid (e.g., `4` for a 4x4 grid).
   - `repetitions`: Number of sequences the player must correctly repeat to win.

## Exports 
Exclusively available on the server side.

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
