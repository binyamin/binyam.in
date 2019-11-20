module Jekyll
    class ColorTag < Liquid::Tag
        def initialize(tag_name, color, tokens)
            super
            @name, @hex = color.split(':',2)
        end

        def render(_context)
            %Q{<figure class="jekyll-color-tag--single"
                style="background-color: #{@hex}; padding-top: 64px; display: inline-block; width: 100%; max-width: 256px; overflow: hidden; margin: 0; border: 1px solid #999;">
                <figcaption
                    style="display: flex; justify-content: center;align-items: flex-start;flex-direction: column;padding: 8px 12px;border-top: 1px solid #999;background-color: #ffffff;">
                    <strong>#{@name}</strong>#{@hex}</figcaption>
            </figure>}
        end

        Liquid::Template.register_tag("color", self)
    end

    class PaletteTag < Liquid::Tag
        def initialize(tag_name, palette, tokens)
            super
            @name, hex = palette.split(':', 2)
            @hex = hex.split(',')
        end

        def render(_context)
            @hex.map{|hex|
            %Q{<div style="background-color:#{hex}; display: flex">
                <span style="background-color: white; padding: 12px 16px; width: 30%; font-size: 14px;">#{hex}</span>
            </div>}}.join('')
            .prepend(%Q{<figure class="jekyll-color-tag--palette" style="margin: 12px 18px; max-width: 256px; border: 1px solid #999; display: inline-block; width: 100%;">
                <figcaption style="padding: 12px; background-color: white; font-size: 18px; border-bottom: 1px solid #999;">#{@name}</figcaption>})
            .concat(%Q{</figure>})
        end
        
        Liquid::Template.register_tag("palette", self)
    end
end