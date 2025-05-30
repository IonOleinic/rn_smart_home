import Svg, { G, Path } from 'react-native-svg'

export default function NoVibrationImage(props) {
  return (
    <Svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size || '200.000000pt'}
      height={props.size || '200.000000pt'}
      viewBox='0 0 200.000000 200.000000'
      preserveAspectRatio='xMidYMid meet'
      fill={props.color || 'currentColor'}
      stroke='none'
      className={props.className}
    >
      <G transform='translate(0.000000,200.000000) scale(0.100000,-0.100000)'>
        <Path
          d='M583 1406 l-28 -24 2 -434 3 -433 25 -22 c26 -23 27 -23 398 -23
l372 0 30 24 30 24 0 432 0 432 -28 24 -28 24 -374 0 -374 0 -28 -24z m770 -7
c12 -7 25 -17 29 -23 10 -14 10 -838 0 -852 -20 -31 -54 -33 -400 -33 l-350
-1 -26 25 -26 24 0 411 0 411 25 24 24 25 351 0 c245 0 358 -3 373 -11z'
        />
      </G>
    </Svg>
  )
}
