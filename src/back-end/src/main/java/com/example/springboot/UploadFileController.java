package com.example.springboot;

import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class UploadFileController {

    /** REGEX
     * LT\n[\n/a-zA-Z0-9_ /:-]*<\s*([1-9]\d*(\.\d+)?)(\w+\/([a-zA-Z]*)|)([1-9]\d*\.\d+?|)
     */
    private static final String resultRegex = "(\r\n|)([a-zA-Z0-9_ /:-])*LT\r\n[\r\na-zA-Z0-9_ /:-]*<\\s*([1-9]\\d*(\\.\\d+)?)(\\w+/([a-zA-Z]*)|)([1-9]\\d*\\.\\d+?|)";

    public String parsePage(PDDocument page) throws IOException {

        PDFTextStripper stripper = new PDFTextStripper();

        String str = stripper.getText(page);
        Pattern p = Pattern.compile(resultRegex);
        Matcher m = p.matcher(str);

        StringBuilder sb = new StringBuilder();
        while(m.find()){
            sb.append("<p>");
            for (int i = 0; i < m.groupCount(); i++) {
                sb.append(m.group(i));
                sb.append("\n");
            }
            sb.append("</p>");
        }
        return sb.toString();

    }

	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/upload/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public String uploadFile(@RequestPart MultipartFile file) throws IOException {

        BufferedInputStream bis = new BufferedInputStream(file.getInputStream());

		PDDocument document = PDDocument.load(bis);

        Splitter splitter = new Splitter();
        List<PDDocument> Pages = splitter.split(document);
        StringBuilder sb = new StringBuilder();

        for (PDDocument page : Pages) {

            sb.append(parsePage(page));
            sb.append("<hr>");

            page.close();
        }
        document.close();
        return sb.toString();

    }
}
