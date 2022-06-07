const ComponentSpinner = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div className="fallback-spinner" style={{ backgroundColor: 'black', opacity: 0.6, width: '100%', height: '100%', display: 'flex', position: 'fixed', zIndex: 9999999, justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading">
            <div className="effect-1 effects"></div>
            <div className="effect-2 effects"></div>
            <div className="effect-3 effects"></div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ComponentSpinner
