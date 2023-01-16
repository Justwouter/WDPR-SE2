

class Zaal extends React.Component {

  state = {
    isSelected: false,
  }

  setSelected = () => {
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render() {
    const { size, setSize } = this.props;
    return (
      <button
        id="sizeButton"
        className={this.state.isSelected ? 'selected' : ''}
        onClick={() => {
          this.setSelected();
          setSize(size);
        }}
      >
        {size.toUpperCase()}
      </button>
    )
  }
}