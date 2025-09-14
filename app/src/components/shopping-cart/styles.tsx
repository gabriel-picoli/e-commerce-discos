import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
`

export const CartWrapper = styled.div`
  position: relative;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  z-index: 100;
  position: relative;
`

export const SideCart = styled.aside`
  position: fixed;
  top: 0;
  right: -400px;
  width: 360px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;

  &.active {
    right: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;

    h2 {
      font-size: 18px;
      font-weight: 600;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }

  .items {
    flex: 1;
    overflow-y: auto;
    padding: 16px;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 12px;
      }

      p {
        font-size: 14px;
        margin: 0;
      }

      span {
        font-size: 12px;
        color: #555;
      }
    }
  }

  .subtotal {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-top: 1px solid #eee;
    font-size: 14px;

    strong {
      color: #d97706;
    }
  }

  footer {
    display: flex;
    justify-content: space-around;
    padding: 12px;
    border-top: 1px solid #eee;

    button {
      flex: 1;
      margin: 0 4px;
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #333;
      background: none;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
`
