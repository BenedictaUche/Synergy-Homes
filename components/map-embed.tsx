type MapEmbedProps = {
    embedUrl: string
    height?: number
  }

  export default function MapEmbed({
    embedUrl,
    height = 450
  }: MapEmbedProps) {
    return (
      <div style={{ width: "100%", height }}>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15853.062635427452!2d3.293456665998431!3d6.6138790754696295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b910917150fa9%3A0x979712af59cefaae!2s9%20Dopemu%20Rd%2C%20Agege%2C%20Ikeja%20100273%2C%20Lagos!5e0!3m2!1sen!2sng!4v1766712885428!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    )
  }
