/* gold colors */
const gold = 'rgb(204, 137, 37)' //primereact warn message color
const goldShadowLight = 'rgba(204, 137, 37,0.3)'
const goldShadowDark = 'rgba(204, 137, 37,0.6)'
const goldTranLight = 'rgba(204, 137, 37,0.15)'
const goldTranDark = 'rgba(204, 137, 37,0.25)'

/* green colors */
const green = 'rgb(30, 169, 124)' //primereact success message color
const greenShadowLight = 'rgba(30, 169, 124, 0.3)'
const greenShadowDark = 'rgba(30, 169, 124, 0.6)'
const greenTranLight = 'rgba(30, 169, 124, 0.15)'
const greenTranDark = 'rgba(30, 169, 124, 0.25)'

/* red colors */
const red = 'rgb(255, 90, 90)'
const redShadowLight = 'rgba(255, 90, 90, 0.3)'
const redShadowDark = 'rgba(255, 90, 90, 0.6)'
const redTranLight = 'rgba(255, 90, 90, 0.15)'
const redTranDark = 'rgba(255, 90, 90, 0.25)'

/* blue colors */
const blue = 'rgb(0, 123, 255)' //primereact light-blue theme primary color
const pressedBlue = 'rgb(0, 98, 204)' //primereact light-blue theme primary hover color
const blueShadowLight = 'rgba(0, 123, 255, 0.3)'
const blueShadowDark = 'rgba(0, 123, 255, 0.6)'
const blueTranLight = 'rgba(0, 123, 255, 0.15)'
const blueTranDark = 'rgba(0, 123, 255, 0.25)'

/* purple colors */
const purple = 'rgb(180, 94, 255)'
const pressedPurple = 'rgb(151, 31, 255)'
const purpleShadowLight = 'rgba(180, 94, 255, 0.3)'
const purpleShadowDark = 'rgba(180, 94, 255, 0.6)'
const purpleTranLight = 'rgba(180, 94, 255, 0.15)'
const purpleTranDark = 'rgba(180, 94, 255, 0.25)'

/* indigo colors */
const indigo = 'rgb(99, 102, 241)' //primereact light-indigo theme primary color
const pressedIndigo = 'rgb(67,56,202)' //primereact light-indigo theme primary hover color
const indigoShadowLight = 'rgba(99, 101, 241, 0.3)'
const indigoShadowDark = 'rgba(99, 101, 241, 0.6)'
const indigoTranLight = 'rgba(99, 102, 241, 0.15)'
const indigoTranDark = 'rgba(99, 102, 241, 0.25)'

/* grey colors */
const lightGrey = 'rgb(220, 220, 220)'
const mediumGrey = 'rgb(204, 204, 204)' // #ccc
const mediumGreyTran = 'rgba(204, 204, 204, 0.6)'
const darkGrey = 'rgb(125, 125, 125)'
const darkGreyTran = 'rgba(125, 125, 125,0.6)'
const veryDarkGrey = 'rgb(55, 55, 55)'

/*========== default colors ============*/
const active = indigo
const inactiveLight = mediumGrey
const inactiveDark = darkGrey
const pressed = pressedIndigo
const pressedTranLight = indigoTranLight
const pressedTranDark = indigoTranDark
const iconPressedBckLight = mediumGreyTran
const iconPressedBckDark = darkGreyTran
const boxShadowActiveLight = indigoShadowLight
const boxShadowActiveDark = indigoShadowDark
const boxShadowErrorLight = redShadowLight
const boxShadowErrorDark = redShadowDark
const inputBorderLight = '#d1d5db'
const inputBorderDark = '#d1d5db'
const link = blue
const linkPressed = pressedBlue
const error = red
const info = blue
const success = green
const warning = gold
const errorBckLight = redTranLight
const errorBckDark = redTranDark
const infoBckLight = blueTranLight
const infoBckDark = blueTranDark
const successBckLight = greenTranLight
const successBckDark = greenTranDark
const warningBckLight = goldTranLight
const warningBckDark = goldTranDark
const pageBckLight = lightGrey
const pageBckDark = veryDarkGrey
const rippleLight = 'rgba(0, 0, 0, 0.22)'
const rippleDark = 'rgba(255, 255, 255, 0.32)'
const ripplePwrBtnOnLight = indigoTranLight
const ripplePwrBtnOffLight = 'rgba(0, 0, 0, 0.22)'
const ripplePwrBtnOnDark = indigoTranDark
const ripplePwrBtnOffDark = 'rgba(255, 255, 255, 0.32)'

export const Colors = {
  light: {
    text: 'black',
    background: 'white',
    icon: 'black',
    iconPressedBck: iconPressedBckLight,
    active: active,
    inactive: inactiveLight,
    link: link,
    linkPressed: linkPressed,
    error: error,
    errorBck: errorBckLight,
    info: info,
    infoBck: infoBckLight,
    success: success,
    successBck: successBckLight,
    warning: warning,
    warningBck: warningBckLight,
    buttonText: 'white',
    buttonBck: active,
    buttonPressedBck: pressed,
    buttonPressedBckTran: pressedTranLight,
    tabBarBck: lightGrey,
    placeholderText: darkGrey,
    boxShadowActive: boxShadowActiveLight,
    boxShadowError: boxShadowErrorLight,
    pageBck: pageBckLight,
    inputBorder: inputBorderLight,
    ripple: rippleLight,
    ripplePwrBtnOn: ripplePwrBtnOnLight,
    ripplePwrBtnOff: ripplePwrBtnOffLight,
  },
  dark: {
    text: 'white',
    background: 'black',
    icon: 'red',
    iconPressedBck: iconPressedBckDark,
    active: active,
    inactive: inactiveDark,
    link: link,
    error: error,
    errorBck: errorBckDark,
    info: info,
    infoBck: infoBckDark,
    success: success,
    successBck: successBckDark,
    warning: warning,
    warningBck: warningBckDark,
    buttonText: 'white',
    buttonBck: active,
    buttonPressedBck: pressed,
    buttonPressedBckTran: pressedTranDark,
    tabBarBck: veryDarkGrey,
    placeholderText: darkGrey,
    boxShadowActive: boxShadowActiveDark,
    boxShadowError: boxShadowErrorDark,
    pageBck: pageBckDark,
    inputBorder: inputBorderDark,
    ripple: rippleDark,
    ripplePwrBtnOn: ripplePwrBtnOnDark,
    ripplePwrBtnOff: ripplePwrBtnOffDark,
  },
}
