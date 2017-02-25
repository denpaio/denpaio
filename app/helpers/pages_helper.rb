# frozen_string_literal: true
module PagesHelper
  def render_denpaio_app
    react_component(
      'DenpaioApp',
      props: {
        default_background_image: image_url('pixiv_46722568_q70')
      },
      prerender: false
    )
  end
end
