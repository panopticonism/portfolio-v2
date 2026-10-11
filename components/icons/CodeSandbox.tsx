import { IconProps } from "./types";

export const CodeSandbox = (props: IconProps) => {
  const { width, height } = props;

  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      width={width}
      height={height}
      viewBox="0 0 256 296"
    >
        <title>CodeSandbox</title>
      <path d="M115.5 261.09V154.48l-91.684-52.75v60.773l41.997 24.347v45.701L115.5 261.09zm23.814.627 50.605-29.151v-46.784l42.269-24.495v-60.011l-92.874 53.62v106.82zm80.66-180.89-48.817-28.29-42.863 24.873-43.188-24.897L35.854 81.18l91.914 52.882 92.206-53.235zM.004 222.207V74.487L127.994-.008l128.01 74.182v147.8l-128.02 73.744L.004 222.207z" />
    </svg>
  );
};
