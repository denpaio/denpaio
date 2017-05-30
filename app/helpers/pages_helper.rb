# frozen_string_literal: true

module PagesHelper
  def render_denpaio_app
    react_component(
      'DenpaioApp',
      props: {
        backgroundImage: image_url('pixiv_1457391_gz.jpg')
      },
      prerender: false
    )
  end
end
