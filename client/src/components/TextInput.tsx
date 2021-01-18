import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

type Props = {
  label?: string;
  value?: string;
  handleChange: Function;
};

const TextInput = <PROPS extends Props>({
  label,
  value,
  handleChange,
}: PROPS): JSX.Element => {
  return (
    <div className="input-container">
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">{label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          value={value}
          onChange={() => handleChange()}
        />
      </InputGroup>
      <br />
    </div>
  );
};

export default TextInput;
