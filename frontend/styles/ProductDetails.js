import styled from 'styled-components'

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
`
export const ImageWrapper = styled.div`
  width: 40%;
  img {
    width: 100%;
  }
`

export const ProductInfo = styled.div`
  width: 40%;
  h3 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  p {
    color: var(--secondary);
    margin: 0 0 0.5rem 0;
  }
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: #fff;
    background: var(--primary);
  }
`

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;

  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }

  p {
    width: 1rem;
    text-align: center;
  }

  span {
    color: var(--secondary);
  }

  svg {
    color: #494949;
  }
`

export const BuyStyles = styled.div`
  display: flex;
  button {
    width: 100%;
    background: var(--primary);
    color: #fff;
    font-weight: 500;
  }
`
