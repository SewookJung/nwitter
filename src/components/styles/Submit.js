import styled from 'styled-components';
import Colors from 'components/styles/Colors';

export const Submit = styled.input`
  background-color: ${Colors.Twitter};
  border: 0;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  color: white;
  margin-left: 10px;
`;

export const Cancel = styled.button`
  background-color: ${Colors.Cancel};
  border: 0;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  color: white;
`;

export const Edit = styled.button`
  background-color: ${Colors.Edit};
  border: 0;
  padding: 10px 10px;
  border-radius: 10px;
  font-weight: 700;
  color: white;
`;

export const Delete = styled.button`
  background-color: ${Colors.Cancel};
  border: 0;
  padding: 10px 10px;
  border-radius: 10px;
  font-weight: 700;
  color: white;
`;
