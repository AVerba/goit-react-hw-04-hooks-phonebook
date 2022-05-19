import styles from './Input.module.css';
import { Title } from '../Title';
import { Container } from '../../Container';
import PropTypes from 'prop-types';

export const Input = ({
  title,
  type,
  name,
  value,
  placeholder,
  pattern,
  onChange,
}) => {
  return (
    <>
      <Title>{title}</Title>
      <input
        type={type}
        name={name}
        key={name}
        value={value}
        onChange={onChange}
        pattern={pattern}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </>
  );
};
Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
