import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {

  transform(input: string, ...args: unknown[]): string {
        // Regular expression to match the pattern with room
        const regexWithRoom = /(\d+)\.\s(.+?)\s\((\d+)\)\s\[(.+?)\]/;

        // Regular expression to match the pattern without room
        const regexWithoutRoom = /(\d+)\.\s(.+?)\s\[(.+?)\]/;
    
        // Extracting matched groups
        let match = input.match(regexWithRoom);
    
        if (match && match.length === 5) {
            const index = match[1];
            const subject = match[2];
            const room = match[3];
            const time = match[4];
    
            // Formatting the text with room
            const formattedText = `${index}. ${subject} (<u>${room}</u>) [<b>${time}</b>]`;
            return formattedText;
        } else {
            // Try matching the pattern without room
            match = input.match(regexWithoutRoom);
            if (!(match && match.length === 4)) return input;
            
            const index = match[1];
            const subject = match[2];
            const time = match[3];
    
            // Formatting the text without room
            const formattedText = `${index}. ${subject} [<b>${time}</b>]`;
            return formattedText;
        }
  }
}
