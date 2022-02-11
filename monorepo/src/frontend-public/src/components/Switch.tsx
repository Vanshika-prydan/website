import { styled } from "@mui/system";
import clsx from "clsx";
import { useSwitch, UseSwitchProps } from "@mui/base/SwitchUnstyled";

const SwitchRoot = styled("span")`
  display: inline-block;
  position: relative;
  width: 82px;
  height: 36px;
  padding: 7px;
  &.checked > span {
    background-color: #395165;
  }
  &.disabled > span {
    background-color: #aab4be !important;
  }
`;

const SwitchInput = styled("input")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled("span")(
  ({ theme }) => `
  position: absolute;
  display: block;
  background-color: ${theme.palette.mode === "dark" ? "#000" : "#aab4be"};
  width: 15px;
  height: 15px;
  border-radius: 16px;
  top: 10px;
  left: 11px;
  background-color: #fff;
  color:'#395165';
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  &:before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
   background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 30 30"><path fill="${encodeURIComponent(
    "#395165"
  )}"  d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"/></svg>') center center no-repeat;
  }
  &.focusVisible {
     background-color: #fff;
   }
    &.checked {
      transform: translateX(51px);
      left: 5px;
      top: 10px;
      background-color:#395165;
       &:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 30 30"><path fill="${encodeURIComponent(
    "#fff"
  )}" d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21.707,12.707l-7.56,7.56 c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0 l2.746,2.746l6.853-6.853c0.391-0.391,1.023-0.391,1.414,0S22.098,12.316,21.707,12.707z"/></svg>');
        }
      &.disabled {
          background-color:#fff;
          &:before {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 30 30"><path fill="${encodeURIComponent(
    "#395165"
  )}" d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21.707,12.707l-7.56,7.56 c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0 l2.746,2.746l6.853-6.853c0.391-0.391,1.023-0.391,1.414,0S22.098,12.316,21.707,12.707z"/></svg>');
        }
      }
  }
`);

const SwitchTrack = styled("span")(
  ({ theme }) => `
  background-color: ${theme.palette.mode === "dark" ? "#000" : "#fff"};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: block;
  margin-bottom:30px;
  border: 1px solid #395165; 
`);

const MUISwitch = (props: UseSwitchProps) => {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);
  const stateClasses = {
    checked,
    disabled,
    focusVisible
  };
  const { onChange, ref } = getInputProps();

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput ref={ref} checked={checked} onChange={onChange} type="checkbox" aria-label="Demo switch" />
    </SwitchRoot>
  );
};
export default MUISwitch;
