package com.myreceipts.myreceipts.web;

import com.myreceipts.myreceipts.model.Grad;
import com.myreceipts.myreceipts.model.Prodavnica;
import com.myreceipts.myreceipts.model.Smetka;
import com.myreceipts.myreceipts.model.vm.Page;
import com.myreceipts.myreceipts.security.CurrentUser;
import com.myreceipts.myreceipts.security.UserPrincipal;
import com.myreceipts.myreceipts.service.GradService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path="/api/gradovi", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:3000")
@Secured("ROLE_USER")
public class GradController {
    private final GradService gradService;

    public GradController(GradService gradService) {
        this.gradService = gradService;
    }

    @GetMapping
    public List<Grad> findAll() {
        return this.gradService.getAllGradovi();
    }

    @GetMapping(path = "/{idGrad}/smetki")
    public Page<Smetka> findAllOdFirma(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                       @RequestHeader(name = "page-size", defaultValue = "10", required = false) int size,
                                       @PathVariable(name = "idGrad") int idGrad,
                                       @RequestParam(name = "pr", required = false) int idProdavnica,
                                       @RequestParam(name = "sp", required = false) Double startPrice,
                                       @RequestParam(name = "ep", required = false) Double endPrice,
                                       @RequestParam(name = "sd", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                       @RequestParam(name = "ed", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return this.gradService.findAllSmetkiInGrad(userPrincipal.getId().longValue(),page, size, idGrad, idProdavnica, startPrice, endPrice, startDate, endDate);
    }

    @GetMapping(path = "/{idGrad}/prodavnici")
    public List<Prodavnica> getAllProdavniciVoFirma(@PathVariable(name = "idGrad") Integer idGrad) {
        return this.gradService.getAllProdavnici(idGrad);
    }

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Grad createGrad(@RequestBody String ime){
        return this.gradService.createGrad(ime);
    }
}
