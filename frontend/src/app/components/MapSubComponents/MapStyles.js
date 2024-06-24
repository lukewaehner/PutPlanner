import styled from "styled-components";

export const InfoWindowContent = styled.div`
  background: #fff;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 250px;
`;

export const InfoWindowTitle = styled.h2`
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const InfoWindowText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const MapContainer = styled.div`
  width: 60%;
  min-width: 600px;
  height: calc(100vh - 60px);
`;
