import { RefObject, useEffect } from "react"
import { Keyboard, TextInput } from "react-native"


export function useBlurInputOnKeyboardDismiss(inputs: RefObject<TextInput>[]) {
    useEffect(() => {
        const subscription = Keyboard.addListener("keyboardDidHide", () => {
            inputs.forEach(input => {
                input.current?.blur()
            })
        })

        return () => subscription.remove()
    }, [])
}
