local p = nil
local open = false

local function StartSimonSays(cb, gridSize, repetitions)
    if not open then
        p = promise.new()
        open = true
        SendNUIMessage({
            type = "startGame",
            gridSize = gridSize,
            repetitions = repetitions
        })
        SetNuiFocus(true, true)
        local result = Citizen.Await(p)
        cb(result)
        open = false
    end
end

exports("StartSimonSays", StartSimonSays)

-- Listen for the NUI callback from the JavaScript
RegisterNUICallback('endGame', function(data, cb)
    SetNuiFocus(false, false)
    p:resolve(data.success)
    p = nil
    open = false
    cb('ok')
end)